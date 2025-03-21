import { useState } from "react"



const NewTicket = () => {
    const [price, setPrice] = useState('');
    const [ticket, setTicket] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title: ticket,
            price: price
        },
      onSuccess: () => Router.push('/')
    });


  const onSubmit = (e) => {
    e.preventDefault();
    doRequest();
  } 

return (
<div>
    <h1>Create a Ticket</h1>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input value={ticket} onChange={(e) => setTicket(e.target.value)} className="form-control" />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
</div>)
}