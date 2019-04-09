@rejections.each do |rejection|
    json.set! rejection.id do
        json.extract! rejection, :id, :rejector_id, :rejected_id
    end
end 