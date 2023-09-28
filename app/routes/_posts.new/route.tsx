export default function NewPost() {
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="post">Tópico</label>
          <input type="text" name="post" id="post" />
        </div>
        <div>
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="city">Cidade</label>
          <input type="text" name="city" id="city" />
        </div>
        <div>
          <label htmlFor="country">País</label>
          <input type="text" name="country" id="country" />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input type="text" name="tags" id="tags" />
        </div>
        <button type="submit">Criar</button>
      </form>
    </div>
  )
}
