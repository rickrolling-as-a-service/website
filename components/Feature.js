export default ({ title, children }) => (
  <div>
    <h2 className='feature-title'>{title}</h2>
    <p className='text-muted feature-info'>
      {children}
    </p>  
  </div>
)