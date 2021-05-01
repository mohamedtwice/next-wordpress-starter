import Head from 'next/head'
import Link from 'next/link'
import { gql } from '@apollo/client';

import { getApolloClient } from 'lib/apollo-client';

import styles from '../../styles/Home.module.css'

export default function Pattern({ pattern, site }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{ pattern.title }</title>
        <meta name="description" content={`Read more about ${pattern.title} on ${site.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          { pattern.title }
        </h1>

        <div className={styles.grid}>
          <div className={styles.content} dangerouslySetInnerHTML={{
            __html: pattern.content
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
  const { patternSlug } = params;
console.log(`patterns/`+patternSlug)
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query PatternBySlug($uri: String!) {
        generalSettings {
          title
        }
        patternBy(uri: $uri) {
          id
          content
          title
          slug
        }
      }
    `,
    variables: {
      uri: `patterns/`+patternSlug
    }
  });
console.log(data)
  const pattern = data?.data.patternBy;
console.log(pattern)
  const site = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      pattern,
      site
    }
  }
}

export async function getStaticPaths() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
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

  const patterns = data?.data.patterns.edges.map(({ node }) => node);

  return {
    paths: patterns.map(({ slug }) => {
      return {
        params: {
          patternSlug: slug
        }
      }
    }),
    fallback: false
  }
}