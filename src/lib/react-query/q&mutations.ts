import { useQuery,useInfiniteQuery,useQueryClient,useMutation  } from '@tanstack/react-query'
import { createUserAccount, signInAccount } from '../appwrite/api'
import { INewUser } from '@/types'
//mainly using tanstakc for helpingin pagination and fetching the data and many more
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {email: string; password: string}) => signInAccount(user)
    })
}