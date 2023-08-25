import BlogCard from '@/components/BlogCard';
import { NextPage } from 'next';

interface Props {}

const Blogs: NextPage<Props> = () => {
    return (
        <div className='max-w-3xl mx-auto p-5 space-y-5'>
            <BlogCard
                title="This is my Blog."
                description='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda ad modi rerum corrupti itaque animi non hic nostrum officia debitis?'
            />
            <BlogCard
                title="This is my Blog."
                description='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda ad modi rerum corrupti itaque animi non hic nostrum officia debitis?'
            />
            <BlogCard
                title="This is my Blog."
                description='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda ad modi rerum corrupti itaque animi non hic nostrum officia debitis?'
            />
        </div>
    )
}

export default Blogs;