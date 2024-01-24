import { useToast } from '@/components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import { SignupValidation } from '@/lib/Validation'
import { z } from 'zod'
// import load from '@/components/shared/Loader'
import { Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/q&mutations'
import { Toast } from '@radix-ui/react-toast'
import { useUserContext } from '@/context/AuthContext'; 


const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext(); 
 
const isLoading=false;
//mutateAsync(our called function) = mutationFn()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const { mutateAsync: createUserAccount , isPending: isCreatingAccount }= useCreateUserAccount();
const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values)
    if(!newUser)
    {
      return(toast({ title: 'Sign up failed. Please try again later'}));
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })
    if(!session)
    {
      return Toast({title: 'Sign up failed. Please try again later'})
    }
    const isLoggedIn= await checkAuthUser();
    if(isLoggedIn)
    {
      form.reset();
      navigate('/');
    }
    else{
      toast({title: 'Sign up failed. Please try again'})
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img src="/assets/images/ssp.png" alt="pogo" className='w-20' />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-6'>Create a new Account</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>To use InstaKillo enter your account details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="fle flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Userame</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            {isCreatingAccount? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className='text-small-regular text-light-2 text-center mt-2'>
            Already have an account
            <Link to="/sign-in" className='text-secondary-500 text-small-semibold ml-1'>Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm