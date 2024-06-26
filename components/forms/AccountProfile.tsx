"use client"
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import * as z from "zod"
import Image from 'next/image'
import { ChangeEvent, use, useState } from 'react'
import { Textarea } from '../ui/textarea';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { updateUser } from '@/lib/actions/user.action';
import { usePathname, useRouter } from 'next/navigation';
/**defining the structure if a Props object */
interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}
const AccountProfile = ({ user, btnTitle }: Props) => { //accept {user,btnTitle} as a type of Props

    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("media");
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || '', //the values we get from the clerk API when user sign up is associate to the user account we deliver to the form on the onboarding page
            name: user?.name || '',
            username: user?.username || '',
            bio: user?.bio || '',
        }
    });

    /**handles the image upload operation on the onboarding page */
    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault(); //prevent the browser from reload the window

        /**read a file from the file reader */
        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) { //check if there is a file and if yes it enters the if statment
            const file = e.target.files[0]; //assosciat the file wevw choose to the file const

            setFiles(Array.from(e.target.files)); //set the files const to the filethe user upload
            if (!file.type.includes('image')) return; //check if the file is an image

            //if not
            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || ""; //read the URL

                fieldChange(imageDataUrl); //update the field
            }

            fileReader.readAsDataURL(file); //finally change the image
        }
    }

    // 2. Define a submit handler. //in action when the submit button is pressed
    const onSubmit = async (values: z.infer<typeof UserValidation>) => {

        const blob = values.profile_photo; // associate the profile photo to blob const

        const hasImageChanged = isBase64Image(blob);//check if the image has changes by the user

        if (hasImageChanged) {
            const imgRes = await startUpload(files); //uploading the image

            if (imgRes && imgRes[0].fileUrl) { //if the file does exist, it updates the values
                values.profile_photo = imgRes[0].fileUrl;
            }
        }

        //update the user in the DB
        await updateUser({
            userId: user.id,
            username: values.username,
            name: values.name,
            bio: values.bio,
            image: values.profile_photo,
            path: pathname
        });

        if (pathname === '/profile/edit') {
            router.back(); //go to the previous page after editing
        } else {
            router.push('/');//move to the page '/'
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col jusify-start gap-10">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem
                            className='flex items-center gap-4'
                        >
                            <FormLabel
                                className='account-form_image-label'
                            >
                                {field.value ? (
                                    <Image
                                        src={field.value}
                                        alt='profile photo'
                                        width={96}
                                        height={96}
                                        priority
                                        className='rounded-full object-contain'
                                    />
                                ) : (
                                    <Image
                                        src='/assets/profile.svg'
                                        alt='profile pfoto'
                                        width={24}
                                        height={24}
                                        className='object-contain'
                                    />
                                )}
                            </FormLabel>
                            <FormControl
                                className='flex-1 trxt-base-semibold text-gray-200'
                            >
                                <Input
                                    type='file'
                                    accept='image/*'
                                    placeholder='Upload a photo'
                                    className='account-form_image-input'
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem
                            className='flex flex-col w-full gap-3'
                        >
                            <FormLabel
                                className='text-base-semibold text-light-2'
                            >
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem
                            className='flex gap-3 w-full flex-col'
                        >
                            <FormLabel
                                className='text-base-semibold text-light-2'
                            >
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem
                            className='flex gap-3 w-full flex-col'
                        >
                            <FormLabel
                                className='text-base-semibold text-light-2'
                            >
                                Bio
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={10}
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='bg-primary-500'>Submit</Button>
            </form>
        </Form>
    )
}

export default AccountProfile