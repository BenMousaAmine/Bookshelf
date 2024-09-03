import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
  Avatar,
} from '@material-tailwind/react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { BaseURL } from '../costants/environment.ts';
import axios from 'axios';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { load, remove } from '../store/localstorage.ts';
import { UserData } from '../interface/UserData.ts';
import avatar from '../assets/images/avatar.png';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [companyPosition, setCompanyPosition] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(avatar);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const loadImagePath = () => {
      const imagePath = localStorage.getItem('profileImage');
      if (imagePath) {
        setProfileImage(imagePath);
      }
    };

    loadImagePath();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const userData: UserData | null = load();
      if (userData === null) {
        return;
      }

      const {
        username,
        firstName,
        lastName,
        company,
        position,
        password,
        phone,
      } = userData;
      setEmail(username);
      firstName && setFirstName(firstName);
      lastName && setLastName(lastName);
      company && setCompany(company);
      position && setCompanyPosition(position);
      password && setPassword(password);
      phone && setPhone(phone);
    };
    getUserData();
  }, []);
  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(`${BaseURL}/logout`, { username: email, password });
      remove();
      localStorage.removeItem('profileImage');
      navigate('/login');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const saveImageLocally = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setProfileImage(reader.result.toString());
            localStorage.setItem('profileImage', reader.result.toString());
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pb-16">
      <Card color="transparent" shadow={false}>
        <Typography variant="h3" style={{ color: 'black' }}>
          Menu
        </Typography>
        <div className={'mt-6'}>
          <Typography variant="h6" style={{ color: 'black' }}>
            Profile picture
          </Typography>
          <div className={'mt-2'}>
            <Avatar src={profileImage} alt="avatar" size="xxl" />
            <Button
              variant="outlined"
              className={'ml-3.5'}
              onClick={handleButtonClick}
            >
              Upload picture
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                saveImageLocally(e);
              }}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
        </div>
        {loading && (
          <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
            <Spinner className="h-12 w-12" />
          </div>
        )}

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              value={email}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none ',
              }}
              type="email"
              disabled={true}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Desired Password
            </Typography>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                value={password}
                disabled={true}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center h-10">
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
              <p style={{ color: '#076A47' }} className={'mt-2'}>
                Change Password
              </p>
            </div>
            <Typography variant="h6" color="blue-gray" className="-mb-3 -mt-2">
              First name
            </Typography>
            <Input
              value={firstName}
              disabled={true}
              placeholder="your name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              type="text"
              onChange={e => setFirstName(e.target.value)}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Last name
            </Typography>
            <Input
              value={lastName}
              disabled={true}
              placeholder="your last name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              type="text"
              onChange={e => setLastName(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Company
            </Typography>
            <Input
              value={company}
              disabled={true}
              size="lg"
              placeholder="your company"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              type="text"
              onChange={e => setCompany(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Company position
            </Typography>
            <Input
              value={companyPosition}
              disabled={true}
              placeholder="your company position"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              type="text"
              onChange={e => setCompanyPosition(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Phone
            </Typography>
            <Input
              value={phone}
              disabled={true}
              placeholder="your phone number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              type="number"
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          {loading && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
              <Spinner className="h-12 w-12" />
            </div>
          )}
        </form>
        <hr className="m-2" />
        <Typography variant="h4" style={{ color: 'black' }}>
          Contacts
        </Typography>
        <div className={'flex justify-between mt-6 '}>
          <Typography variant="h6" style={{ color: 'black' }}>
            Email
          </Typography>
          <Typography variant="small" style={{ color: 'black' }}>
            email@email.it
          </Typography>
        </div>
        <div className={'flex justify-between mt-6 '}>
          <Typography variant="h6" style={{ color: 'black' }}>
            WhatsApp
          </Typography>
          <Typography variant="small" style={{ color: 'black' }}>
            3515555555
          </Typography>
        </div>
        <Typography
          variant="h6"
          style={{ color: '#9B1C1C' }}
          className={'mt-4 mb-3 hover:underline cursor-pointer'}
          onClick={logout}
        >
          Logout
        </Typography>
      </Card>
    </div>
  );
};

export default Account;
