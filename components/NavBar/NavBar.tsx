import Link from 'next/link';

export default function NavBar(): React.ReactElement {
  const menuEntries = [
    {
      label: 'Employees',
      link: '/employees',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block w-6 mr-2 stroke-current"
          viewBox="0 0 24 24"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx="12" cy="7" r="4"></circle>
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
        </svg>
      ),
    },
    {
      label: 'Time off types',
      link: '/types',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block w-6 mr-2 stroke-current"
          viewBox="0 0 24 24"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M19.823 19.824a2 2 0 0 1 -1.823 1.176h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 1.175 -1.823m3.825 -.177h9a2 2 0 0 1 2 2v9"></path>
          <line x1="16" y1="3" x2="16" y2="7"></line>
          <line x1="8" y1="3" x2="8" y2="4"></line>
          <path d="M4 11h7m4 0h5"></path>
          <line x1="11" y1="15" x2="12" y2="15"></line>
          <line x1="12" y1="15" x2="12" y2="18"></line>
          <line x1="3" y1="3" x2="21" y2="21"></line>
        </svg>
      ),
    },
    {
      label: 'Add time off',
      link: '/add',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block w-6 mr-2 stroke-current"
          viewBox="0 0 24 24"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <rect x="4" y="5" width="16" height="16" rx="2"></rect>
          <line x1="16" y1="3" x2="16" y2="7"></line>
          <line x1="8" y1="3" x2="8" y2="7"></line>
          <line x1="4" y1="11" x2="20" y2="11"></line>
          <line x1="10" y1="16" x2="14" y2="16"></line>
          <line x1="12" y1="14" x2="12" y2="18"></line>
        </svg>
      ),
    },
  ];
  return (
    <div className="navbar m-1 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">
          <Link href="/">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-6 mr-2 stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <polyline points="5 12 3 12 12 3 21 12 19 12"></polyline>
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
              </svg>
              Time off tracker
            </a>
          </Link>
        </span>
      </div>
      <div className="flex-none hidden px-2 mx-2 md:flex">
        <div className="flex items-stretch">
          {menuEntries.map((entry) => {
            return (
              <Link href={entry.link} key={entry.label}>
                <a className="btn btn-ghost btn-sm rounded-btn">
                  {entry.icon}
                  {entry.label}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex-none md:hidden">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
