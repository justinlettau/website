import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Layout, RepoCard } from '../components';
import avatar from '../public/avatar.png';
import { fetchRepos, GitHubRepo } from '../utils';

interface HomeProps {
  repos: GitHubRepo[];
}

const Home: NextPage<HomeProps> = ({ repos }) => {
  const links = [
    {
      label: 'GitHub',
      icon: faGithub,
      url: 'https://github.com/justinlettau',
    },
    {
      label: 'Twitter',
      icon: faTwitter,
      url: 'https://twitter.com/JustinLettau',
    },
  ];

  return (
    <>
      <Head>
        <title>Justin Lettau</title>
      </Head>

      <Layout>
        <section className="p-8 lg:p-20">
          <Image src={avatar} alt="Justin Lettau" width={80} height={80} />
          <h1 className="text-5xl font-bold leading-none">Justin Lettau</h1>
          <p className="text-lg text-neutral-400">Software Engineer</p>

          <ul className="mt-10 flex gap-10">
            {links.map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  target="_blank"
                  className="flex items-center text-neutral-300 transition-colors hover:text-white"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span className="pl-2">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {repos.length > 0 && (
          <section className="p-8 lg:p-20">
            <h2 className="mb-10 text-3xl font-bold">Projects</h2>
            <div className="grid gap-4 lg:grid-cols-3">
              {repos.map((x) => (
                <RepoCard key={x.id} repo={x} />
              ))}
            </div>
          </section>
        )}
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  let repos: GitHubRepo[] = [];

  try {
    repos = await fetchRepos();
  } catch (error) {
    console.log(error);
  }

  return {
    props: { repos },
  };
}

export default Home;
