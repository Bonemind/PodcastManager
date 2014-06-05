from peewee import *
import bcrypt
import auth
db = SqliteDatabase("test.db")

class BaseModel(Model):
    class Meta:
        database = db

class Group(BaseModel):
    groupname = CharField(unique = True)
    def getRoles(self):
        roles = []
        for gr in GroupRoles.select().where(GroupRoles.group == self):
            roles.append(gr.role)
        return roles

    def hasRole(self, rolename):
        role = None
        try:
            role = Role.get(Role.rolename == rolename)
        except Role.DoesNotExist:
            return False
        roles = []
        for gr in GroupRoles.select().where(GroupRoles.group == self).where(GroupRoles.role == role):
            roles.append(gr.role)
        if len(roles) == 1:
            return True
        return False


class Role(BaseModel):
    rolename = CharField(unique = True);

class GroupRoles(BaseModel):
    group = ForeignKeyField(Group, related_name="grouprole_group")
    role = ForeignKeyField(Role, related_name="grouprole_role")
    class Meta:
        indexes = (
            (("group", "role"), True),
        )

class User(BaseModel):
    username = CharField(unique = True)
    email = CharField()
    password = CharField()
    token = CharField()
    group = ForeignKeyField(Group, related_name="user_group")
    def setPassword(self, password = None):
        if not password:
            return
        hashed = bcrypt.hashpw(password, bcrypt.gensalt())
        self.password = hashed
        self.token = bcrypt.gensalt()
        self.save()

    def checkPassword(self, password = None):
        if not password:
            return False
        hashed = bcrypt.hashpw(password, self.password)
        return hashed == self.password

    def hasRole(self, role):
        if not self.group:
            return False
        return self.group.hasRole(role)


def initTables():
    User.create_table(True)
    Group.create_table(True)
    Role.create_table(True)
    GroupRoles.create_table(True)

def createTestData():
    g1 = Group.create(groupname="admin")
    g2 = Group.create(groupname="mod")
    g3 = Group.create(groupname="user")
    u = User.create(username = "test", email="some@test.xx", password = "", token="", group = g3)
    u.setPassword("testpw")
    print u.username + "  " + u.password + "  " + u.email + " " + u.token
    r1 = Role.create(rolename="ban")
    r2 = Role.create(rolename="kick")
    r3 = Role.create(rolename="read")
    GroupRoles.create(group = g1, role = r1)
    GroupRoles.create(group = g1, role = r2)
    GroupRoles.create(group = g1, role = r3)
    GroupRoles.create(group = g2, role = r2)
    GroupRoles.create(group = g2, role = r3)
    GroupRoles.create(group = g3, role = r3)

    print auth.getUserFromToken(u.token)
    print(g1.hasRole("kick"))
    print u.hasRole("asdasdsad")
    

