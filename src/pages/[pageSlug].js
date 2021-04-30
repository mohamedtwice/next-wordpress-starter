import Head from 'next/head'
import Link from 'next/link'
import { gql } from '@apollo/client';

import { getApolloClient } from 'lib/apollo-client';

import styles from '../styles/Home.module.css'

export default function Page({ page, site }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{ page.title }</title>
                <meta name="description" content={`Read more about ${page.title} on ${site.title}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    { page.title }
                </h1>

                <div className={styles.grid}>
                    <div className={styles.content} dangerouslySetInnerHTML={{
                        __html: page.content
                    }} />
                </div>

                <p className={styles.backToHome}>
                    <Link href="/">
                        <a>
                            &lt; Back to home
                        </a>
                    </Link>
                </p>
            </main>
        </div>
    )
}

export async function getStaticProps({ params = {} } = {}) {
    const { pageSlug } = params;

    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: gql`
      query PageBySlug($uri: String!) {
        generalSettings {
          title
        }
        pageBy(uri: $uri) {
          id
          content
          title
          slug
        }
      }
    `,
        variables: {
            uri: pageSlug
        }
    });

    const page = data?.data.pageBy;

    const site = {
        ...data?.data.generalSettings
    }

    return {
        props: {
            page,
            site
        }
    }
}

export async function getStaticPaths() {
    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: gql`
      {
        pages(first: 10000) {
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

    const pages = data?.data.pages.edges.map(({ node }) => node);

    return {
        paths: pages.map(({ slug }) => {
            return {
                params: {
                    pageSlug: slug
                }
            }
        }),
        fallback: false
    }
}