<h3 align="center">GoBarber</h3>

<div align="center">

</div>

---

<p align="center"> Project developed with the mentoring of <a href="https://github.com/diego3g">Diego Fernandes </a>
    <br>
</p>

## 📝 Contents

- [About](#about)
- [Get-Started](#getting_started)
- [Tests](#tests)
- [Run in dev](#deployment)

- [Integrations](#acknowledgement)

## 🧐 About <a name = "about"></a>

Project development in GoStack of RocketSeat

## 🏁 Getting Started <a name = "getting_started"></a>

To run in your machine, follow the steps below.

```
git clone https://github.com/JoaoRabelo98/gobarbernode.git

cd gobarbernode

yarn

docker run --name mongodb -p 27017:27017 -d -t mongo

docker run --name redis -p 6379:6379 -d -t redis:alpine

docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

yarn typeorm migration:run


```

## 🔧 Running the tests <a name = "tests"></a>

To tests in your machine, run the command below.

```
yarn test
```

## 🎉 Integrations and Databases <a name = "acknowledgement"></a>

- [Amazon SES](https://github.com/JoaoRabelo98/gobarbernode/blob/master/src/shared/container/providers/MailProvider/implementations/SESMailProvider.ts)
- [Amazon S3](https://github.com/JoaoRabelo98/gobarbernode/blob/master/src/shared/container/providers/StorageProvider/implementations/S3StorageProvider.ts)
- [Postgres](https://github.com/JoaoRabelo98/gobarbernode/blob/master/src/modules/users/infra/typeorm/repositories/UsersRepository.ts)
- [MonboDB](https://github.com/JoaoRabelo98/gobarbernode/blob/master/src/modules/notifications/infra/typeorm/repositories/NotificationsRepository.ts)
- [Redis](https://github.com/JoaoRabelo98/gobarbernode/blob/master/src/shared/container/providers/CacheProvider/implementations/RedisCacheProvider.ts)
