class CarSerializer < ActiveModel::Serializer
  attributes :id, :make, :model, :year, :color, :user_id
end
