# App


GymPass style app.

## RFs(Requesitos funcionais)

- [x] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usúario logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter seu historico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias pelo nomes
- [ ] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuário
- [ ] Deve ser possível cadastrar um academia.

## RNs (Regra de negócio) --Sepre estar associada a um requisito funcional

- [x] O usuario não deve poder se cadastrar com um e-mail duplicado
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuãrio não pode fazer check-in se não estiver perto (100 m) da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só poderá ser validado por administradores.
- [ ] A academia só poderá ser cadastrada por administradores



## RFNs (Requesitos não-funcionais) --Requisitos que não partem do cliente são requisitos mais tecnicos - ex estragia de cache, qual banco utilizar.

- [x] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisam estar persistidos em uma banco postgreQSL
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário dever ser identificado por um JWT(JSON WEB TOKEN)