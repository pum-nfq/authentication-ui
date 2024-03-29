import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import Fieldset from '../../components/Fieldset/Fieldset';
import { useGlobalData } from '../../components/GlobalDataProvider/GlobalDataProvider';
import Tooltip from '../../components/Tooltip/Tooltip';
import { message } from '../../utils/message';
import './SignIn.css';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const ContextData = useGlobalData();
  const navigate = useNavigate();
  const role = ContextData.selectRole();

  useEffect(() => {
    if (role) navigate('/');
  });

  const onSubmit = async (data) => {
    const responseData = await ContextData.signIn(data);
    if (responseData.status === 200) {
      if (data.remember) localStorage.setItem('token', responseData.token);
      else sessionStorage.setItem('token', responseData.token);
      ContextData.handleUser({
        email: responseData.email,
        role: responseData.role,
      });
      ContextData.handleLoading(false);
      navigate('/dashboard');
      message('success', "Let's dig in", 1000);
    } else {
      ContextData.handleLoading(false);
      message('error', 'Your email or password incorrect!', 1000);
    }
    reset();
  };

  return (
    <div className="sign-in-wrapper">
      <div className="sign-up-ctn">
        <div className="form-title-ctn">
          <h1>
            Sign In<span className="dot-icon">.</span>
          </h1>
          <p>Welcome back my friend. Now please sign in to use this app.</p>
        </div>

        <form
          className="form-sign-up"
          id="form-sign-up"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Fieldset
            id="email"
            type="text"
            labelName="Email"
            placeHold="example@email.com"
            require={true}
            errorMess={errors.email && errors.email.message}
            register={{
              ...register('email', {
                required: { value: true, message: 'Email is required' },
                pattern: {
                  value:
                    // eslint-disable-next-line no-useless-escape
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Email is invalid',
                },
              }),
            }}
          />
          <Tooltip label="If you forgot your account. Please contact to Admin 😀!">
            <Fieldset
              id="password"
              type="password"
              labelName="Password"
              placeHold="******"
              require={true}
              errorMess={errors.password && errors.password.message}
              register={{
                ...register('password', {
                  required: { value: true, message: 'Password is required' },
                  minLength: {
                    value: 6,
                    message: 'Password must have at least 6 characters',
                  },
                  maxLength: 50,
                }),
              }}
            />
          </Tooltip>
          <Checkbox
            name="remember"
            value="remember"
            register={{
              ...register('remember'),
            }}
          >
            Remember me
          </Checkbox>
          <Button
            htmlType="submit"
            type="primary"
            block={true}
            className="button-submit-sign-in"
          >
            Submit
          </Button>
        </form>
        <div className="form-footer-wrapper">
          <p>Not have an account yet?</p>
          <Link className="sign-in" to="/sign-up">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
