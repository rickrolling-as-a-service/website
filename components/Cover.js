export default ({ heading, lead, action, onClick }) => (
  <section className='jumbotron jumbotron-fluid cover'>
    <div className='container text-center'>
      <h1 className='cover-heading display-4'>{heading}</h1>
      <p className='cover-lead lead'>{lead}</p>
      <div className='lead'>
        <button onClick={onClick} className='btn btn-lg btn-secondary cover-btn'>{action}</button>
      </div>
    </div>
  </section>
)