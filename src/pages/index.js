import Head from 'next/head'
import Link from 'next/link'
import { gql } from '@apollo/client';

import { getApolloClient } from 'lib/apollo-client';

import styles from '../styles/Home.module.css'

export default function Home({ page, posts, pages, docs, patterns }) {
  const { title, description } = page;
  console.log(patterns)
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

        <h2>Pages</h2>
        <ul className={styles.grid}>
          {pages && pages.length > 0 && pages.map(page => {
            return (
                <li key={page.slug} className={styles.card}>
                  <Link href={page.path}>
                    <a>
                      <h3 dangerouslySetInnerHTML={{
                        __html: page.title
                      }} />
                      <div dangerouslySetInnerHTML={{
                        __html: page.excerpt
                      }} />
                    </a>
                  </Link>
                </li>
            );
          })}
        </ul>

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
