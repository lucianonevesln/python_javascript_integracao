// observa a interacao do usuario com a aplicacao atraves do click de botao
$('#id_botao').click(function(e)
{
    e.preventDefault(); // previne o comportamento padrao do JS
    // recebe valores digitados pelo usuario
    var nome = $('[name=idNomeCompleto]').val()
    var email = $('[name=idEmail]').val()
    // armazena ids para onde o servidor deve enviar a resposta
    var respNomeCompleto = $('[name=respNomeCompleto]')
    var respIdEmail = $('[name=respIdEmail]')

    // valida se todas as variaveis foram preenchidas
    if (nome != '' && email != '') 
    {
        // cria objeto a partir de valores recebidos
        var cadastro = 
        {
            nome: nome,
            email: email
        }

        // inicia secao ajax
        $.ajax(
            {
                type: 'POST', // define o metodo request
                url: '/api', // associacao de rota criada no servidor
                dataType: 'json', // define o tipo de dado
                contentType: 'application/json; charset=utf-8', // define como o navegador deve renderizar sinalizacao das palavras
                data: JSON.stringify(cadastro),
                // na hipotese de sucesso, e gerado o callback
                success: function(callback) 
                {
                    console.log(callback); // mostra o objeto no console para teste
                    // insere os valores do objeto em variaveis que renderizam as respostas ao usuario
                    respNomeCompleto.val(callback.nome.toUpperCase())
                    respIdEmail.val(callback.email)
                    // limpa os campos para receber novas infomacoes
                    document.querySelector('#idNomeCompleto').value = ''
                    document.querySelector('#idEmail').value = ''
                },
                // na hipotese de erro, retorna mensagem de erro no navegador
                error: function() 
                {
                    $(this).html("error!");
                }
            });
    } else 
    {
        // resposta se caso as variaveis nao foram preenchidas ou foram preenchidas parcialmente
        respNomeCompleto.val('nome não informado')
        respIdEmail.val('e-mail não informado')
        return
    }
});