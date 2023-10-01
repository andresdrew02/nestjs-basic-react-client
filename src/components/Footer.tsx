import { DiGithubFull } from 'react-icons/di'
import { PiGlobeHemisphereEastFill } from 'react-icons/pi'

export default function Footer() {
  return (
    <footer className="footer items-center p-4 text-neutral-content">
      <aside className="items-center grid-flow-col">
        <p>Copyright © 2023 - All rights are not reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a className='btn btn-ghost text-5xl' href='https://github.com/andresdrew02' target='_blank'>
          <DiGithubFull/>
        </a>
        <a className='btn btn-ghost text-3xl' href="https://andresdrew.vercel.app" target='_blank'>
            <PiGlobeHemisphereEastFill/>
        </a>
      </nav>
    </footer>
  );
}
