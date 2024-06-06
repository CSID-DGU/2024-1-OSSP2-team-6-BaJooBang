insert into request(mold_living, mold_rest, mold_shoes, mold_veranda, mold_window, power_shower, power_wash, power_water, price_request, request_date, lighting, time_water, member_id, house_id, status)
values (1, 0, 0, 0, 1, 1, 0, 2, 4000, '2024-04-14', "good", 32, 1, 1, "매칭 전"),
(0, 1, 1, 0, 1, 2, 2, 2, 5000, '2024-04-17', "bad", 42, 2, 1, "매칭 전");

select * from request;