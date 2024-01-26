import { useToast } from '@/components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import { SigninValidation } from '@/lib/Validation'
import { z } from 'zod'
// import load from '@/components/shared/Loader'
import { Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import {  useSignInAccount } from '@/lib/react-query/q&mutations'
import { Toast } from '@radix-ui/react-toast'
import { useUserContext } from '@/context/AuthContext'; 


const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext(); 

 
// const isLoading=false;
//mutateAsync(our called function) = mutationFn()
const { mutateAsync: signInAccount } = useSignInAccount();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    // const newUser = await signInAccount(values)
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })
    if(!session)
    {
      return toast({ title: 'Sign up failed. Please try again later'});
    }
    const isLoggedIn= await checkAuthUser();
    // console.log);
    if(isLoggedIn)
    {
      form.reset();
      navigate('/');
    }
    else{
      return toast({title: 'Sign up failed. Please try again'})
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img src="/assets/images/ssp.png" alt="pogo" className='w-20' />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-6'>Log In to your Account</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>Welcome Back! please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="fle flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input type='email' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary mt-3">
            {isUserLoading? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign un"
            )}
            </Button>
             <p className='text-small-regular text-light-2 text-center mt-2'>
            Want to go for Sign up
            <Link to="/sign-in" className='text-secondary-500 text-small-semibold ml-1'>Sign up</Link>
          </p>
          
        </form>
      </div>
    </Form>
  )
}

export default SigninForm

// import React, { useRef, useState } from "react";

// interface SigninFormProps {
//   // Add any props if needed
// }

// const SigninForm: React.FC<SigninFormProps> = () => {
//   const password = useRef<HTMLInputElement>(null);
//   const email = useRef<HTMLInputElement>(null);

//   const callref = () => {
//     if (email.current && password.current && email.current.value && password.current.value) {
//       localStorage.setItem("email", email.current.value);
//       localStorage.setItem("password", password.current.value);
//       alert("Created successfully");
//     } else {
//       alert("Not a valid user");
//     }
//   };
//   // email.current?.value
//   console.log(localStorage.getItem("email" ))

//   const [initial, setInitial] = useState<string>("Signup");

//   return (
//     <>
//       <section id="signup-form">
//         <h2>{initial}</h2>
//         <form>
//           <label htmlFor="email">Email:</label>
//           <input type="email" id="email" name="email" ref={email} required />

//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" name="password" ref={password} required />

//           <p>
//             <button type="button" onClick={() => setInitial("Signup")}>
//               Sign Up
//             </button>
//           </p>
//           <button type="button" onClick={callref}>
//             Sign Up
//           </button>
//         </form>
//       </section>
//     </>
//   );
// };

// export default SigninForm;
