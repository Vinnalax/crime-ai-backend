from datetime import datetime


def process_features(data):

    current_date = datetime.now()

    latitude = data.Latitude
    longitude = data.Longitude

    day = data.day if data.day else current_date.day

    month = (
        data.month
        if data.month
        else current_date.month
    )

    year = (
        data.year
        if data.year
        else current_date.year
    )

    weekday = (
        data.weekday
        if data.weekday is not None
        else current_date.weekday()
    )

    is_weekend = (
        data.is_weekend
        if data.is_weekend is not None
        else 1 if weekday >= 5 else 0
    )

    features = [[
        latitude,
        longitude,
        day,
        month,
        year,
        weekday,
        is_weekend
    ]]

    return features