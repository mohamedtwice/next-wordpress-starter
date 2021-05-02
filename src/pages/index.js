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

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.description}>{ description }</p>

        <div className="flex flex-wrap overflow-hidden lg:-mx-1 xl:-mx-2">

          <div className="w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:my-1 lg:px-1 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
              <div className={styles.card}>
          <h2 className="max-w-lg w-full p-4">Pages</h2>

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
          <h2>Posts</h2>
            <ul className={styles.grid}>
              {posts && posts.length > 0 && posts.map(post => {
                return (
                    <li key={post.slug} className={styles.card}>
                      <Link href={post.path}>
                        <a>
                          <h3 dangerouslySetInnerHTML={{
                            __html: post.title
                          }} />
                          <div dangerouslySetInnerHTML={{
                            __html: post.excerpt
                          }} />
                        </a>
                      </Link>
                    </li>
                );
              })}

              {!posts || posts.length === 0 && (
                  <li>
                    <p>
                      Oops, no posts found!
                    </p>
                  </li>
              )}
            </ul>
          </div>


          <div className="w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:my-1 lg:px-1 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
            <div className={styles.card}>
              <h2 className="max-w-lg w-full p-4">Docs</h2>

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
              <h2 className="max-w-lg w-full p-4">Patterns</h2>

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
