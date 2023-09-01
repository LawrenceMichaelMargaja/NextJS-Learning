import BlogCard from '@/components/BlogCard';
import { readPostsInfo } from '@/lib/helper';
import { PostApiResponse } from '@/utils/types';
import { InferGetStaticPropsType } from 'next';
import { GetStaticProps, NextPage } from 'next';


/**
 * This functions 
 */
export const getStaticProps = async () => {
    /**
     * Fetching an api inside of this function or in getStaticPaths causes an error because  
     */
    // const {postInfo}: PostApiResponse = await fetch('http://localhost:3000/api/posts').then(data => data.json());

    const postInfo: PostApiResponse = readPostsInfo()

    return {
        props: {posts: postInfo}
    }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Blogs: NextPage<Props> = ({posts}) => {

    return (
        <div className='max-w-3xl mx-auto p-5 space-y-5'>
            {posts.map(post => <BlogCard
                key={post.slug}
                title={post.title}
                description={post.meta}
                slug={post.slug} 
            />)}
        </div>
    )
}

export default Blogs;