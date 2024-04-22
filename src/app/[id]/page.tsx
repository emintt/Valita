export default async function TicketDetails({ params } : { params: { id: string }}) {
  const id = params.id;
  console.log(params);
  // const = await getTicket(params.id)

  return (
      <main>
          <nav>
              <h2>Ticket Details</h2>
          </nav>
          <div className="card">
              <h3>title</h3>

          </div>
      </main>
  )
}