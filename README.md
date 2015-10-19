# DBServer Rango Now Project #

This project is a resolution of the DBServer code exam lunch voting system.
The solution is available at the address http://dbserver.rangonow.com.br/.

## Problem definition ##

Os times da DBserver enfrentam um grande problema. Como eles são muito democráticos, todos os dias eles gastam 30 minutos decidindo onde eles irão almoçar. Vamos fazer um pequeno sistema que auxilie essa tomada de decisão!

### Estórias ###

**Estória 1**
* Eu como profissional faminto: Quero votar no meu restaurante favorito, para que eu consiga democraticamente levar meus colegas a comer onde eu gusto.
* Critério de Aceitação: Um professional só pode votar em um restaurante por dia.

**Estória 2**
* Eu como facilitador do processo de votação: Quero que um restaurante não possa ser repetido durante a semana para que não precise ouvir reclamações infinitas!
* Critério de Aceitação: O mesmo restaurante não pode ser escolhido mais de uma vez durante a semana.

**Estória 3**
* Eu como profissional faminto: Quero saber antes do meio dia qual foi o restaurante escolhido para que eu possa me despir de preconceitos e preparar o psicológico.
* Critério de Aceitação: Mostrar de alguma forma o resultado da votação.


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


## SO Dependencies ##

* Node.js >= 0.10 
* NPM >= 1.3.10
* MongoDB >= 2.4
