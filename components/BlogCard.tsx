import { NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
    title: string;
    description: string;
    slug: string;
}

/**
 * FC as a type here means that this component is a Functional Component.
 */

/**
 * Tutorial wants me to add an <a></a> after the Link tag and then enclose the div in that anchor tag and then not pass any href because next will handle everything.
 * However, I am not doing that right now because when I do, the app get's broken and when I check my UI, when I hover over the links, the behaviour that is supposed to be achieved by the anchor tags is already present.
 * Must study this further.
 * Upon reading the docs, I found out that wtarting with Next.js 13, <Link> renders as <a>, so attempting to use <a> as a child is invalid.
 * I shall proceed without placing an anchor tag in the Link tag.
 */
const BlogCard: FC<Props> = ({title, description, slug}): JSX.Element => {
    return (
        <Link href={'/blogs/' + slug} className='block'>
            <div className="bg-green-100 p-2 rounded cursor-pointer">
                <h1 className='text-gray-900 text-3xl font-semibold'>
                    {title}    
                </h1>
                <p className='text-gray-500'>
                    {description}
                </p>
            </div>
        </Link>
    )
}

export default BlogCard;