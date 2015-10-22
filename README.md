# DBServer Rango Now Project #

This project is a resolution of the DBServer code exam lunch voting system.
The solution is available at the address http://dbserver.rangonow.com.br/.

## Problem definition ##

The DBServer teams face a big problem. As they are very democratic, every day they spend 30 minutes deciding where they will have lunch. Let's make a small system to assist this decision making!

### Stories ###

**Story 1**
I, like a hungry professional, will vote for my favorite restaurant, so I can take democratically my colleagues to eat where I like.
*Acceptance criteria:* A professional can only vote in one restaurant by day.

**Story 2**
I, as a facilitator of the voting process, want that a restaurant can not be repeated during the week so I don't hear endless complaints!
*Acceptance criteria:* The same restaurant can not be chosen more than one time during the week.

**Story 3**
I, like a hungry professional, want to know before noon which was the chosen restaurant so I can undress of prejudices and prepare the psychological.
*Acceptance criteria:* Show somehow the vote results.

<!---
## Design ##

* O que vale destacar no código implementado?
1. Foquei no desenvolvimento completo do sistema end-to-end, ou seja, montei a infra com base MongoDB para persistência e montei uma tela agradável com bootstrap.
2. Subi o sistema no OpenShift para ter uma produção o mais rapidamente possível e ter uma noção da aplicação como um todo.
3. Estruturei aplicação Angular em módulos coerentes e isolados.
4. Modelei o sistema com entidades coerentes com o Mongoose.
5. Separei no servidor Node o código das rotas RESTFul do código da persistência dos modelos.

* O que poderia ser feito para melhorar o sistema?
1. Extrair do código de definição das rotas a lógica mais baixo nível das features para diminuir o acoplamento.
2. Testar mais sistematicamente o sistema. Ao focar no end-to-end, na usabilidade e no dev ops descuidei a sistemática dos testes.
3. Criar mecanismo de logs profissional.
4. Usar framework de DI no Node.
5. Melhorar as referências entre objetos na modelagem do mongoose.
6. Montar grunt corretamente.
7. Minificar o sistema no modo produção.
8. Executar verificação JSHint.
9. Validação dos dados do front-end. Realizei validações de dados do usuário no fron-end, mas não as repliquei no back-end.
10. Separar mongoose model do layer de acesso.

* Algo a mais que você tenha a dizer
1. Não consegui finalizar a implementação da Estória 2, mas montei a sua infra e o seu esqueleto com a entidade de banco e o node-schedule.
2. Focando na usabilidade e na infra end-to-end do sistema acabei ficando sem tempo para finalizar as estórias e testar o sistema coerentemente.
-->

## SO Dependencies ##

* Node.js >= 0.10 
* NPM >= 1.3.10
* MongoDB >= 2.4
