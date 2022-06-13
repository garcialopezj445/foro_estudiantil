create database foro_estudiantil;

use foro_estudiantil;

create table usuario(
    identificacionUsuario varchar(15) not null,
    contraseña varchar(50) not null,
    nombreUsuario varchar(50) not null,
    rolUniversidad varchar(15) not null,
    constraint pk_usuario primary key (identificacionUsuario)
);

create table so(
    codigoSO int(1) not null,
    identificacionUsuario varchar(15) not null
    constraint pk_SO primary key (codigoSO)
);

create table hilo(
    identificacionHilo int(11) not null auto_increment,
    descripcionHilo varchar(2000) not null,
    referencasBibliograficas varchar(500) not null
    codigoSO_hilo int(1) not null,
    identificacionUsuario_hilo varchar(15) not null,
    constraint pk_hilo primary key (identificacionHilo),
    constraint fk_hilo_so foreign key (codigoSO_hilo) references so(codigoSO),
    constraint fk_hilo_usuario foreign key (identificacionUsuario_hilo) references usuario(identificacionUsuario),
);

