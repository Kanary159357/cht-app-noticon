import { Button } from '@/components/ui/button'
import { close } from '@/utils/wam'
import { PropsWithChildren } from 'react'

function HeaderLayout({ children }: PropsWithChildren) {
  return (
    <div className="sticky top-0 z-10 flex bg-background py-5">
      {children}
      <Button variant="secondary" className="ml-auto" onClick={() => close()}>
        X
      </Button>
    </div>
  )
}

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="m-auto flex max-w-[600px] flex-col justify-center px-10">
      {children}
    </div>
  )
}

const Layout = Object.assign({}, { Header: HeaderLayout, Main: MainLayout })

export default Layout
