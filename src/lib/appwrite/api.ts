import { ID, Query } from "appwrite"
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { string } from "zod";

export async function createUserAccount(user: INewUser) //INewUser
{//this is only for auth functionalities
    try {
        const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
        )
        if(!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(user.name)
        const newUser = await saveUserToDB({//appwrite stores the id uses $id
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
            
        })
        return newUser;
    } catch (error) {
        console.log(error);
    }
}
//destructuring the user
export async function saveUserToDB(user: {//this function is for adding new user
accountId: string;
email: string;
name: string;
imageUrl: URL;
username?: string,
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user:{email: string, password: string}) {
 try {//creating simply email session
    const session = await account.createEmailSession(user.email, user.password);
    return session;
 } catch (error) {
    console.log(error);
 }   
}

export async function getCurrentUser() {//Signed in account
try {
    const currentAccount = await account.get();
    if(!currentAccount) throw Error;  //if current account does not exist
    //but if it exist than get its details from the databases
    const CurrentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
    )
    if(!CurrentUser) throw Error;
    
    return CurrentUser.documents[0];
} catch (error) {
    console.log(error);
    return null;
}
    
}








// import { ID, Query } from "appwrite";
// import { INewUser } from "@/types";
// import { account, appwriteConfig, avatars, databases } from "./config";
// import { string } from "zod";

// export async function createUserAccount(user: INewUser) {
//     try {
//         const newAccount = await account.create(
//             ID.unique(),
//             user.email,
//             user.password,
//             user.name
//         );

//         if (!newAccount) {
//             throw Error('Error creating account');
//         }

//         const avatarUrl = avatars.getInitials(user.name);

//         // Pass the 'accountid' when saving the user to the database
//         const newUser = await saveUserToDB({
//             accountId: newAccount.$id,
//             email: newAccount.email,
//             name: newAccount.name,
//             imageUrl: avatarUrl,
//             username: user.username,
//         });

//         return newUser;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export async function saveUserToDB(user: {
//     accountId: string;
//     email: string;
//     name: string;
//     imageUrl: URL;
//     username?: string;
// }) {
//     try {
//         // Include 'accountid' in the user document
//         const newUser = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,// Use 'accountid' as the document ID
//             user,
//         );

//         return newUser;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export async function signInAccount(user: { email: string; password: string }) {
//     try {
//         const session = await account.createEmailSession(user.email, user.password);
//         return session;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export async function getCurrentUser() {
//     try {
//         const currentAccount = await account.get();

//         if (!currentAccount) {
//             throw Error('Current account not found');
//         }

//         const currentUser = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             [Query.equal('accountId', currentAccount.$id)]
//         );

//         if (!currentUser) {
//             throw Error('User document not found');
//         }

//         return currentUser.documents[0];
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }
