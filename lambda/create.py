import datetime
'''
{
  "todos": [
    "2021-01-01",
    "2020-12-01",
    "2021-11-01",
  ]
}
'''


def prev_month(dt):
    y = dt.year
    m = dt.month
    if m == 1:
        m = 12
        y -= 1
    else:
        m -= 1
    return datetime.date(y, m, 1)


def lambda_handler(event, context):
    print(event)
    print(context)
    todos = []
    dt = datetime.date.today()
    for i in range(12):
        dt = prev_month(dt)
        todos.append({'date': dt.isoformat()})
    print(todos)
    return {'todos': todos}
