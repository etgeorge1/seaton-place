import BackHome from './BackHome'

export default function PageHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-16">
      <div className={`flex items-center gap-4 ${children ? 'mb-6' : ''}`}>
        <BackHome />
        <h1 className="text-5xl md:text-7xl font-bold font-mono">{title}</h1>
      </div>
      {children}
    </div>
  )
}
