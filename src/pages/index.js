import Head from 'next/head'
import Link from 'next/link'
import { gql } from '@apollo/client';

import { getApolloClient } from 'lib/apollo-client';

import styles from '../styles/Home.module.css'

export default function Home({ page, posts, pages, docs, patterns }) {
  const { title, description } = page;
  console.log(patterns, docs)
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*<div className="w-full bg-gradient-to-br from-indigo-900 to-green-900 overflow-auto">*/}
      {/*  <div className="container max-w-5xl mx-auto px-4">*/}
      {/*    <div className="w-4/5">*/}
      {/*      <h1 className="mt-32 text-white text-6xl font-bold">The fastest, most secure dev environment <br/><span*/}
      {/*          className="text-blue-400">on the planet.</span></h1>*/}
      {/*    </div>*/}
      {/*    <div className="w-5/6 my-10 ml-6">*/}
      {/*      <h3 className="text-gray-300">*/}
      {/*        Create, edit & deploy fullstack apps with <br/>*/}
      {/*        <strong className="text-white">faster package installations & greater security</strong>*/}
      {/*        <br/>than even local environments.*/}
      {/*      </h3>*/}
      {/*    </div>*/}
      {/*    <div className="hidden sm:block opacity-50 z-0">*/}
      {/*      <div className="shadow-2xl w-96 h-96 rounded-full -mt-72"></div>*/}
      {/*      <div className="shadow-2xl w-96 h-96 rounded-full -mt-96"></div>*/}
      {/*      <div className="shadow-xl w-80 h-80 rounded-full ml-8 -mt-96"></div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.description}>{ description }</p>



        <div className="flex flex-wrap overflow-hidden lg:-mx-1 xl:-mx-2">

          <div className="w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:my-1 lg:px-1 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
              <div className={styles.card}>
          <h2 className="max-w-lg w-full p-4 text-3xl">Pages</h2>

              {pages && pages.length > 0 && pages.map(page => {
                return (
                    <div key={page.slug} className="max-w-lg w-full p-1">
                      <Link href={page.path}>
                      <a className="text-blue-700  inline-flex items-center font-semibold tracking-wide">
                    <span className="hover:underline text-2xl">
                        {page.title}
                    </span>
                        <span className="text-xl ml-2">&#8594;</span>
                      </a>
                      </Link>
                    </div>
                )
              })}
              </div>
          </div>



          <div className="w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:my-1 lg:px-1 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
            <div className={styles.card}>
              <h2 className="max-w-lg w-full p-4 text-3xl">Posts</h2>
              {posts && posts.length > 0 && posts.map(post => {
                return (
                    <div key={post.slug} className="max-w-lg w-full p-1">
                      <Link href={post.path}>
                        <a className="text-blue-700  inline-flex items-center font-semibold tracking-wide">
                    <span className="hover:underline text-2xl">
                        {post.title}
                    </span>
                          <span className="text-xl ml-2">&#8594;</span>
                        </a>
                      </Link>
                    </div>
                );
              })}
            </div>
          </div>


          <div className="w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:my-1 lg:px-1 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
            <div className={styles.card}>
              <h2 className="max-w-lg w-full p-4 text-3xl">Docs</h2>

              {docs && docs.length > 0 && docs.map(doc => {
                return (
                    <div key={doc.slug} className="max-w-lg w-full p-1">
                      <Link href={doc.path}>
                        <a className="text-blue-700  inline-flex items-center font-semibold tracking-wide">
                    <span className="hover:underline text-2xl">
                        {doc.title}
                    </span>
                          <span className="text-xl ml-2">&#8594;</span>
                        </a>
                      </Link>
                    </div>
                )
              })}
            </div>
          </div>


          <div className="w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:my-1 lg:px-1 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
            <div className={styles.card}>
              <h2 className="max-w-lg w-full p-4 text-3xl">Patterns</h2>

              {patterns && patterns.length > 0 && patterns.map(pattern => {
                return (
                    <div key={pattern.slug} className="max-w-lg w-full p-1">
                      <Link href={pattern.path}>
                        <a className="text-blue-700  inline-flex items-center font-semibold tracking-wide">
                    <span className="hover:underline text-2xl">
                        {pattern.title}
                    </span>
                          <span className="text-xl ml-2">&#8594;</span>
                        </a>
                      </Link>
                    </div>
                )
              })}
            </div>
          </div>


</div>

        {/*<section className="min-h-screen flex items-center justify-center px-4 bg-white">*/}
        {/*  <div className="max-w-lg w-full rounded-lg shadow-lg p-4">*/}
        {/*      <a href="#" className="text-blue-700  inline-flex items-center font-semibold tracking-wide">*/}
        {/*            <span className="hover:underline">*/}
        {/*                Continue to link*/}
        {/*            </span>*/}
        {/*        <span className="text-xl ml-2">&#8594;</span>*/}
        {/*      </a>*/}
        {/*    </div>*/}
        {/*</section>*/}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        generalSettings {
          title
          description
        }
        posts(first: 10000) {
          edges {
            node {
              id
              excerpt
              title
              slug
            }
          }
        }
        pages(first: 10000) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
        docs(first: 10000) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
        
        patterns(first: 10000) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `,
  });

  const posts = data?.data.posts.edges.map(({ node }) => node).map(post => {
    return {
      ...post,
      path: `/posts/${post.slug}`
    }
  });

  const pages = data?.data.pages.edges.map(({ node }) => node).map(page => {
    return {
      ...page,
      path: `/${page.slug}/`
    }
  });

  const docs = data?.data.docs.edges.map(({ node }) => node).map(doc => {
    return {
      ...doc,
      path: `/docs/${doc.slug}/`
    }
  });

  const patterns = data?.data.patterns.edges.map(({ node }) => node).map(pattern => {
    return {
      ...pattern,
      path: `/patterns/${pattern.slug}/`
    }
  });

  const page = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      page,
      posts,
      pages,
      docs,
      patterns,
    }
  }
}
