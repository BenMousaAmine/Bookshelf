import {
    Card,
    Input,
    Button,
    Typography, Spinner,
} from "@material-tailwind/react";
import {useState} from "react";
import {BaseURL} from "../costants/environment.ts";
import axios from 'axios';
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import {firstTime, save} from "../store/localstorage.ts";
import {IoChevronBackOutline} from "react-icons/io5";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [companyPosition, setCompanyPosition] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister =async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (!isValidEmail(email)) {
            alert('Invalid email');
            setLoading(false);
            return;
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            setLoading(false);
            return;
        }
        if (
            firstName.length === 0 ||
            lastName.length === 0 ||
            company.length === 0 ||
            companyPosition.length === 0 ||
            phone.length === 0
        ) {
            alert('Please fill in all fields');
            setLoading(false);
            return;
        }
        if (phone.length !== 10) {
            alert('Phone number must be 10 digits');
            setLoading(false);
            return;
        }
        try {
            const response = await axios({
                method: 'GET',
                url: `${BaseURL}/requestaccess`,
                params: {
                    email,
                    password,
                    firstname: firstName,
                    lastname: lastName,
                    company,
                    position: companyPosition,
                    phone,
                },
            });
            if (response.status === 200) {
                save({
                    username: email,
                    firstName,
                    lastName,
                    company,
                    position: companyPosition,
                    role: 3,
                    phone,
                    password,
                });
                firstTime();
             /*   Alert.alert('Request access', 'Request sent successfully', [
                    { text: 'OK', onPress: () => router.push('/home') },
                ]);*/
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred ');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">

            <Card color="transparent" shadow={true} className={'p-20'}>
                <div className={'flex row-auto align-middle '}>
                    <IoChevronBackOutline size={28}/>
                    <Typography variant="h4" color="blue-gray" className={'mb-4'}>
                        {" "} Request access
                    </Typography>
                </div>

                {loading && (
                    <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
                        <Spinner className="h-12 w-12" />
                    </div>
                )}
                <Typography         variant="small" color="blue-gray" className="-mb-3">

                    Please fill in the following fields to request access to the app.
                </Typography>

                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleRegister}>
                    <div className="mb-1 flex flex-col gap-6">

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Email
                        </Typography>
                        <Input

                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none ",
                            }}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Desired Password
                        </Typography>

                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}

                                placeholder="********"
                                onChange={(e) => setPassword(e.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                {showPassword ? (
                                    <IoMdEyeOff className="cursor-pointer" onClick={togglePasswordVisibility}/>
                                ) : (
                                    <IoMdEye className="cursor-pointer" onClick={togglePasswordVisibility}/>
                                )}
                            </div>
                        </div>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                           First name
                        </Typography>
                        <Input

                            placeholder="your name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            type="text"
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Last name
                        </Typography>
                        <Input

                            placeholder="your last name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            type="text"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Company
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="your company"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            type="text"
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Company position
                        </Typography>
                        <Input

                            placeholder="your company position"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            type="text"
                            onChange={(e) => setCompanyPosition(e.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Phone
                        </Typography>
                        <Input

                            placeholder="your phone number"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            type="number"
                            onChange={(e) =>setPhone(e.target.value)}
                        />
                    </div>
                    {loading && (
                        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
                            <Spinner className="h-12 w-12"/>
                        </div>
                    )}

                    <Button className="mt-6" fullWidth type={"submit"}>
                       Send request
                    </Button>


                </form>
            </Card>
        </div>
    )
}

export default Register


