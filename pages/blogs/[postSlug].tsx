import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage,  } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

type Props = InferGetStaticPropsType<typeof getStaticProps>

/**
 * context in the function getStaticProps is the data received from getStaticPaths
 */

interface IStaticProps extends ParsedUrlQuery {
    postSlug: string
}

type Post = {
    post: {
        title: string;
        content: MDXRemoteSerializeResult;
    }
}

export const getStaticProps: GetStaticProps<Post> = async (context) => {
    console.log("the context === ", context);

    const {params} = context;
    const {postSlug} = params as IStaticProps;

    const filePathToRead = path.join(process.cwd(), "posts/" + postSlug + '.md');
    const fileContent = fs.readFileSync(filePathToRead, {encoding: 'utf-8'});
    // const { content, data } = matter(fileContent);
    const source: any = await serialize(fileContent, {parseFrontmatter: true});

    return {
        props: {
            post: {
                content: source,
                title: source.frontmatter.title
            }
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    // reading paths
    const dirPathToRead = path.join(process.cwd(), "posts")
    const dirs =  fs.readdirSync(dirPathToRead);
    const paths = dirs.map((fileName) => {
        const filePathToRead = path.join(process.cwd(), "posts/" + fileName);
        const fileContent = fs.readFileSync(filePathToRead, {encoding: 'utf-8'});
        return {params: {postSlug: matter(fileContent).data.slug}}
    });

    // console.log("the paths === ", paths);
    
    return {
        paths,
        fallback: false, // we will come back to this later and understand with examples.
    };
}

const SinglePage: NextPage<Props> = ({post}) => {
    const {content, title} = post;
    return (
        <div className='max-w-3xl mx-auto'>
            <h1 className='font-semibold text-2xl py-5'>{title}</h1>
            <div className='prose pb-20'>
                <MDXRemote  {...content} />
            </div>
        </div>
    )
}

export default SinglePage;