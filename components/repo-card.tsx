import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GitHubRepo } from '../utils/fetch-repos';

export interface RepoCardProps {
  repo: GitHubRepo;
}

function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className="bg-zinc-800 transition-all hover:scale-110 hover:bg-zinc-700">
      <a
        href={repo.url}
        className="flex h-full flex-col justify-between px-10 py-8"
        target="_blank"
        rel="noreferrer"
      >
        <div>
          <p className="text-xs uppercase tracking-widest">
            {repo.primaryLanguage}
          </p>
          <h3 className="mt-2 text-2xl font-bold">{repo.name}</h3>
          <p className="mb-4 text-neutral-400">{repo.description}</p>
        </div>
        {repo.stargazerCount > 0 && (
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <FontAwesomeIcon icon={faStar} />
            {repo.stargazerCount}
          </div>
        )}
      </a>
    </article>
  );
}

export default RepoCard;
