'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import { RegisterUserType } from '@/types/user.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/lib/validation';
import RHFInput from '@/components/global-components/RHFInput';
import { registerUser } from '@/http/api';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<RegisterUserType>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (data: RegisterUserType) => {
    try {
      console.log(data);
      await registerUser(data);

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        router.replace('/');
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <RHFInput
                name='name'
                control={control}
                label='Name'
                type='text'
                placeholder='Name'
              />
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
              <RHFInput
                name='confirmPassword'
                control={control}
                label='Confirm Password'
                type='password'
                placeholder='confirm password'
              />

              <Field>
                <Button
                  className='w-full'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </Button>
                <FieldDescription className='text-center'>
                  Already have an account?{' '}
                  <Link  href='/login' className='font-medium hover:underline'>
                    Log in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
