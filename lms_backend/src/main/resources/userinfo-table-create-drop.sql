drop table userinfo_role cascade constraints;

drop table userinfo cascade constraints;

create table userinfo (
    social number (1, 0) not null check (social in (0, 1)),
    email varchar2 (255 char) unique,
    name varchar2 (255 char),
    password varchar2 (255 char),
    userid varchar2 (255 char) not null,
    primary key (userid)
);

create table userinfo_roles (
    roles number (3, 0) check (roles between 0 and 2),
    userid varchar2 (255 char) not null
);

alter table userinfo_roles
add constraint FK1j6xdpa154ms2874irsxdkplt foreign key (userid) references userinfo