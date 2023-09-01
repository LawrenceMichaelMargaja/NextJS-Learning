import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage,  } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useRouter } from 'next/router';

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
    // console.log("the context === ", context);

    try {
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
    } catch (error) {
        return {
            notFound: true
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    // this line joins the current working path and appends "posts" to it.
    const dirPathToRead = path.join(process.cwd(), "posts")

    // Reads the contents of the directory or path passed into it, in this case "dirPathToRead" and returns an array of the contents of the directory or path.
    const dirs =  fs.readdirSync(dirPathToRead);

    // Here since const dirs is an array, we map over it and for each string(fileName), we concat it with the current path we are in as well as "posts/ and assign it to the variable filePathToRead." 
    const paths = dirs.map((fileName) => {
        const filePathToRead = path.join(process.cwd(), "posts/" + fileName);

        //after which we use fs.readFileSync on filePathToRead while using the encoding 'utf-8' so that it will be transcribed with English Characters or Alphabets.
        const fileContent = fs.readFileSync(filePathToRead, {encoding: 'utf-8'});

        // here we are simply populating the return array of the map function with objects containing the params and are formed from each path or string from "filePathToRead". We also use the "matter" function in order to parse front-matter from Markdown files. This allows us to access meta data from the MD files. In this code, we use it to access the slug.
        return {params: {postSlug: matter(fileContent).data.slug}}
    });
    
    // fallback options
    // fasle => this will return 404 page for new unknown slug.
    // blocking => this will first see the path(slug in this case) and it will try to get data from static pages and if there is no data or no page, it will first hand the browser and try to generate a new page.
    // true => return the fake page for some time and once the data is ready it will serve them as page props. It's basically just like the blocking but instead of hanging the browser, it instead returns a fake page.
    
    // After that, this function returns an array that contains multiple objects that also contain the params that nextJS automatically uses for each path object or string defined in "paths". nextJS runs getStaticProps with a context parameter that contains params, which is the same one as the one returned from this function for each one of the paths read in "paths".
    return {
        paths,
        fallback: 'blocking',
    };
}

const SinglePage: NextPage<Props> = ({post}) => {

    const router = useRouter();

    if(router.isFallback) {
        return (
            <p>
                Loading...
            </p>
        )
    }

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