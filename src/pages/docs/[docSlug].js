import Head from 'next/head'
import Link from 'next/link'
import { gql } from '@apollo/client';

import { getApolloClient } from 'lib/apollo-client';

import styles from '../../styles/Home.module.css'

export default function Doc({ doc, site }) {
  return (
      <div className={styles.container}>
        <Head>
          <title>{ doc.title }</title>
          <meta name="description" content={`Read more about ${doc.title} on ${site.title}`} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            { doc.title }
          </h1>

          <div className={styles.grid}>
            <div className={styles.content} dangerouslySetInnerHTML={{
              __html: doc.content
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
  const { docSlug } = params;
  console.log(`docs/`+docSlug)

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query DocBySlug($uri: String!) {
        generalSettings {
          title
        }
        docBy(uri: $uri) {
          id
          content
          title
          slug
        }
      }
    `,
    variables: {
      uri: `docs/`+docSlug
    }
  });

  const doc = data?.data.docBy;

  const site = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      doc,
      site
    }
  }
}

export async function getStaticPaths() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        docs(first: 10000) {
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

  const docs = data?.data.docs.edges.map(({ node }) => node);

  return {
    paths: docs.map(({ slug }) => {
      return {
        params: {
          docSlug: slug
        }
      }
    }),
    fallback: false
  }
}