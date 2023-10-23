import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/conf'

function AllPosts() {
    
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Define an async function for fetching posts
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts([]); // Assuming getPosts is an async function
        if (response && response.documents) {
          setPosts(response.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // Call the async function
    fetchPosts();
  }, []); // Empty dependency array means this effect runs only once on component mount

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts