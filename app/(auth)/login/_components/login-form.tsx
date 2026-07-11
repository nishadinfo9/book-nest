'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from '@/components/ui/field';
import Link from 'next/link';
import GoogleLogin from './google-login';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import RHFInput from '@/components/global-components/RHFInput';
import { LoggedInUserType } from '@/types/user.type';
import { LoginSchema } from '@/lib/validation';
import { signIn } from 'next-auth/react';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoggedInUserType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (data: LoggedInUserType) => {
    console.log(data);
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.ok) {
      router.replace('/');
      router.refresh();
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <GoogleLogin />
              </Field>
              <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
                Or continue with
              </FieldSeparator>
              <RHFInput
                name='email'
                control={control}
                label='Email'
                type='email'
                placeholder='email'
              />

              <RHFInput
                name='password'
                control={control}
                label='Password'
                type='password'
                placeholder='password'
              />

              <Field>
                <Button
                  className='w-full'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging...' : 'Login'}
                </Button>
                <FieldDescription className='text-center'>
                  Don&apos;t have an account?{' '}
                  <Link href='/signup'>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
