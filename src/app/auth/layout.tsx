type IProps = {
    children: React.ReactNode
}

export default function AuthLayout(props: IProps) {
  const { children } = props

  return (
    <>
      <section className="base-layout">
        {children}
      </section>
    </>   
  )
}