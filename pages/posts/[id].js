import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

/**
 * Display a single blog post.
 */
 export default function Post({ post }) {
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </>
  )
}

// Get a list of all the blog posts...
export async function getStaticPaths() {
  
  // Call an external API endpoint to get posts.
  const res = await fetch('https://webdevstudios.com/wp-json/wp/v2/posts')
  
  // Turn the response into JSON.
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts.
  const paths = posts.map((post) => ({
    params: { 
      id: post.id
    }
  }))

  // Return a list of blog posts.
  return { 
    paths,
    fallback: false // Means other routes should 404.
  }
}

// Query a single blog post...
export async function getStaticProps({ params }) {
  
  // Query blog post, based on `params.id`, generated from getStaticPaths()
  const res = await fetch(`https://webdevstudios.com/wp-json/wp/v2/posts/${params.id}`)
  
  // Turn the response into JSON.
  const post = await res.json()

  // Pass data to the <Post /> component.
  return { 
    props: { post }
  }
}