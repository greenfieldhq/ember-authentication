class UserSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :name, :username, :email
end
