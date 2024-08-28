import logo from '../assets/images/logo.png';
import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from '@material-tailwind/react';
import { useState } from 'react';
import { BaseURL } from '../costants/environment.ts';
import axios from 'axios';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { firstTime, save } from '../store/localstorage.ts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    if (isValidEmail(email) && password.length >= 8) {
      try {
        const loginResponse = await axios.post(`${BaseURL}/login`, {
          username: email,
          password: password,
        });
        if (loginResponse.status === 200) {
          const response = await axios.get(`${BaseURL}/users/me`, {
            params: {
              username: email,
              password: password,
            },

            withCredentials: true,
          });

          console.log(response.data);
          save({
            username: response.data.username,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            company: response.data.company,
            position: response.data.position,
            role: response.data.role,
            phone: response.data.phone,
            password: password,
          });
          firstTime();
          //  router.push('/home');
        }
      } catch (error: unknown) {
        console.error(error);
        let message = 'Si è verificato un errore imprevisto. Riprova.';
        if (axios.isAxiosError(error)) {
          switch (error.response?.status) {
            case 400:
              message = 'Richiesta non valida. Controlla i dati inseriti.';
              break;
            case 401:
              message = 'Credenziali non valide. Controlla email e password.';
              break;
            case 404:
              message = 'Servizio non disponibile. Riprova più tardi.';
              break;
            case 500:
              message = 'Errore del server. Riprova più tardi.';
              break;
            default:
              break;
          }
        } else if (error instanceof Error) {
          message = error.message;
        }
        console.log(message);
        //     Alert.alert('Errore di Login', message);
      } finally {
        setLoading(false);
      }
    } else {
      //    Alert('Errore di Login', 'Email o password non validi');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card color="transparent" shadow={true} className={'p-20'}>
        <Typography variant="h4" color="blue-gray" className={'mb-4'}>
          Login or register
        </Typography>
        <img
          src={logo}
          alt="Logo"
          style={{ width: '70%', alignSelf: 'center' }}
        />

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleLogin}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              type="email"
              onChange={e => setEmail(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                size="lg"
                placeholder="********"
                onChange={e => setPassword(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                {showPassword ? (
                  <IoMdEyeOff
                    className="cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <IoMdEye
                    className="cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
          </div>
          {loading && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
              <Spinner className="h-12 w-12" />
            </div>
          )}
          <Typography
            variant="small"
            color="gray"
            className="flex items-center font-normal"
          >
            Forget your password?{' '}
            <a href="#" className="font-semibold" style={{ color: '#076A47' }}>
              Reset it
            </a>
          </Typography>
          <Button className="mt-6" fullWidth type={'submit'}>
            Login
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{' '}
            <a href="#" className="font-semibold" style={{ color: '#076A47' }}>
              Request access
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Login;

export const styleLogin = {
  passwordEye: {
    position: 'absolute',
    right: 90,
  },
};
