import {useEffect, useState} from "react";
import {UserData} from "../interface/UserData.ts";
import {BaseURL} from "../costants/environment.ts";
import axios from "axios";
import {load, remove} from "../store/localstorage.ts";
import {Button, Card, Input, Spinner, Typography} from "@material-tailwind/react";

import {IoChevronBackOutline} from "react-icons/io5";


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        const getUserData = async () => {
            const userData: UserData | null = await load();
            if (userData === null) {
                return;
            }
            const {username, password} = userData;
            setEmail(username);
            setPassword(password);
        };
        getUserData();
    }, []);

    const handleResetPassword=async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (!isValidEmail(email)) {
            alert('Invalid email');
            return;
        }
        try {
            await axios.get(`${BaseURL}/lostpassword/${email}`);
            await axios.post(`${BaseURL}/logout`, {username: email, password});
            await remove();
            setLoading(false);
            /*   Alert.alert(
                   'Reset link',
                   'Check your email and follow the instructions to reset your password.',
                   [{ text: 'OK', onPress: () => router.navigate('auth/login') }],
               );*/
            setLoading(true);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e : unknown) {
            alert('Error');
        } finally {
            setLoading(false);
        }
    };
    return(
    <div className="flex justify-center items-center min-h-screen">

        <Card color="transparent" shadow={true} className={'p-20'}>
            <div className={'flex row-auto align-middle '}>
                <IoChevronBackOutline size={28} />
                <Typography variant="h4" color="blue-gray" className={'mb-4'}>
                    {" "} Reset password
                </Typography>
            </div>

            {loading && (
                <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
                    <Spinner className="h-12 w-12" />
                </div>
            )}
            <Typography         variant="small" color="blue-gray" className="-mb-3">

                Please enter your email address below and we'll send you a link to reset your password.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleResetPassword}>
                <div className="mb-1 flex flex-col gap-6">

                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Email
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button className="mt-6" fullWidth type={"submit"}>
                    Request reset link
                </Button>


            </form>
        </Card>
    </div>)
}

export default ResetPassword;