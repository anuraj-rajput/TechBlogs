import configurations from '../conf/config'

import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
            .setEndpoint(configurations.appwriteUrl)
            .setProject(configurations.appwriteProjectId);
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

     async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                configurations.appwriteDatabaseId,
                configurations.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                configurations.appwriteDatabaseId,
                configurations.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }

            )
        } catch (error) {
            console.log("Appwrite service:: updatePost:: error ",error)
        }
    
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                configurations.appwriteDatabaseId,
                configurations.appwriteCollectionId,
                slug
            )        
            return true;
        } catch (error) {
            console.log("Appwrite service::deletePost::error",error)
            return false;        
        }        
    }

    async getPost(slug) {
        try {
             return await this.databases.getDocument(
                configurations.appwriteDatabaseId,
                configurations.appwriteCollectionId,
                 slug
             )
            
        } catch (error) {
            console.log("Appwrite service::getPost::error", error)
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) { 
        try {
            return await this.databases.listDocuments(
                configurations.appwriteDatabaseId,
                configurations.appwriteCollectionId,
                queries,
            )
            
        
            
        } catch (error) {
            console.log("Appwrite service::getPosts::error", error)
            return false
        }
    }

    // file Upload Services

    async uploadFile(file) { 
        try {

            return await this.bucket.createFile(
                configurations.appwriteBucketId,
                ID.unique(),
                file
            )            
        } catch (error) {
            console.log("Appwrite service::uploadFile::error",error)
            return false; 
        }
    }

    async deleteFile(fileId) { 
        try {
            return await this.bucket.deleteFile(
                configurations.appwriteBucketId,
                fileId)

        } catch (error) {
            console.log("Appwrite service::deleteFile::error",error)
            return false; 
        }
    }

    getFilePreview(fileId) { 
        return this.bucket.getFilePreview(
            configurations.appwriteBucketId,
            fileId
        )
    }

}



const service = new Service()
export default service