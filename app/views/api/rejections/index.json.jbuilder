@rejections.each do |rejection|
    json.extract! rejection, :id, :rejector_id, :rejected_id
end 